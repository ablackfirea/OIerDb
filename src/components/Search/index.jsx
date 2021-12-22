import { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Header, Input, Segment, Table, Modal, Icon } from 'semantic-ui-react';
import Person from '@/components/Person';

// Styles
import styles from './index.module.less';
import './index.css';

// Utils
import getGrade from '@/utils/getGrade';

function PersonCard(props) {
    const { oier } = props;

    const trigger = (
        <Table.Row style={{ cursor: 'pointer' }}>
            <Table.Cell>{oier.name}</Table.Cell>
            <Table.Cell>{oier.provinces.join('/')}</Table.Cell>
            <Table.Cell>{getGrade(oier.enroll_middle)}</Table.Cell>
        </Table.Row>
    );

    return (
        <>
            <Modal
                closeOnEscape
                closeOnDimmerClick
                closeIcon
                trigger={trigger}
                dimmer={{ inverted: true }}
            >
                <Modal.Header>
                    {oier.name}
                    <Link
                        style={{
                            paddingLeft: 5,
                            fontSize: 12,
                            color: 'black',
                            verticalAlign: 'bottom',
                        }}
                        to={'/oier/' + oier.uid}
                    >
                        <Icon name="linkify" />
                    </Link>
                </Modal.Header>
                <Modal.Content>
                    <Person oier={oier} />
                </Modal.Content>
            </Modal>
        </>
    );
}

export default function Search() {
    const [searching, setSearching] = useState(false);
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);

    function onSearchInputChange(value) {
        setSearching(true);
        setResult(null);
        setInput(value)

        const result = OIerDb.oiers.filter(
            (oier) => oier.name === value || oier.initials === value
        );

        setSearching(false);
        setResult(result);
    }

    return (
        <>
            <Header
                className={styles.header}
                block
                as="h4"
                content="搜索"
                attached="top"
                icon="search"
            />
            <Segment attached="bottom">
                <Input
                    fluid
                    placeholder="键入学生姓名或其拼音首字母..."
                    loading={searching}
                    onChange={(_, { value }) => onSearchInputChange(value)}
                    spellCheck="false"
                />
                {result?.length ? (
                    <>
                        <Table basic="very" unstackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        姓名
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        省份
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        年级
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {result.map((oier) => (
                                    <PersonCard
                                        key={oier.uid}
                                        oier={oier}
                                    />
                                ))}
                            </Table.Body>
                        </Table>
                    </>
                ) : (
                    <>
                        {input.length ? (
                            <div style={{ paddingTop: '1rem' }}>
                                未找到结果
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </Segment>
        </>
    );
}
