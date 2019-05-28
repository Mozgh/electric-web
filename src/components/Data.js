import Layout from "./Layout";
import DataGraph from './DataGraph';
import { Tree, Icon, Button, Row, Col, Popover, DatePicker } from "antd";
import { connect } from 'dva';
import DataForm from './DataForm';
import moment from "moment";

const { TreeNode } = Tree;

const Data = ({ dispatch, data }) => {

    const { RangePicker, MonthPicker } = DatePicker;

    const reload = () => {
        dispatch({
            type : 'data/listFactory'
        });
    }

    console.log();

    const loadElectricData = (selectedKeys, { selectedNodes }) => {
        const node = selectedNodes[0];
        if (node === null || node === undefined) {
            dispatch({
                type : 'data/setElectricData',
                payload : {
                    dataA : [],
                    dataB : [],
                    dataC : []
                }
            });
            return;
        }
        const { props } = node;
        const { dataRef } = props;
        const { id } = dataRef;

        dispatch({
            type : 'data/listData',
            payload : {
                cid : id,
                start : data.startTime,
                end : data.endTime,
                phase : "A"
            }
        });
    }

    const buildFactoryNode = () => {
        const { factory } = data;
        let treeNode = [];

        const content = (id) => {
            return (
                <div>
                    <Button onClick={() => showModal("workshop", id)}><Icon type="file-add" /></Button>
                    <Button><Icon type="delete" /></Button>
                </div>
            )
        }

        const options = (name, id) => {
            return (
                <Popover content={content(id)} placement="right" trigger="hover">
                    {name}
                </Popover>
            )
        }
        if (factory) {
            factory.map(f => {
                const { workshops } = f;
                treeNode.push(
                    <TreeNode title={options(f.name, f.id)} key={f.id} selectable={false}>
                        {
                            buildWorkshopNode(workshops)
                        }
                    </TreeNode>
                )
            })
        }
        return treeNode;
    }

    const buildWorkshopNode = (workshops) => {
        let workshopNodes = [];
        const content = (id) => {
            return (
                <div>
                    <Button onClick={() => showModal("circuit", id)}><Icon type="file-add" /></Button>
                    <Button><Icon type="delete" /></Button>
                </div>
            )
        }

        const options = (name, id) => {
            return (
                <Popover content={content(id)} placement="right" trigger="hover">
                    {name}
                </Popover>
            )
        }
        if (workshops) {
            workshops.map(w => {
                workshopNodes.push(
                    <TreeNode title={options(w.name, w.id)} key={w.id + w.name} selectable={false}>
                        {buildCircuitNode(w.circuits)}
                    </TreeNode>
                )
            })
            return workshopNodes;
        } else {
            return;
        }
    }

    const buildCircuitNode = (circuits) => {
        let circuitNodes = [];
        const content = (id) => {
            return (
                <div>
                    <Button onClick={() => showModal("data", id)}><Icon type="file-add" /></Button>
                    <Button><Icon type="delete" /></Button>
                </div>
            )
        }

        const options = (name, id) => {
            return (
                <Popover content={content(id)} placement="right" trigger="hover">
                    {name}
                </Popover>
            )
        }
        if (circuits) {
            circuits.map(c => {
                circuitNodes.push(
                    <TreeNode title={options(c.name, c.id)} key={c.id + '_' + c.name} selectable={true} dataRef={c}></TreeNode>
                )
            })
        }
        return circuitNodes;
    }

    const closeModal = () => {
        dispatch({
            type : 'data/setModalInfo',
            payload : {
                modalVisible : false,
                modalType : ""
            }
        })
    }

    const showModal = (type, id) => {
        dispatch({
            type : 'data/setModalInfo',
            payload : {
                modalVisible : true,
                modalType : type,
                modalInfo : id
            }
        })
    }

    const tree = () => {
        return (
            <div>
                <div>
                    <Button onClick={reload}><Icon type="reload" /></Button>
                    <Button onClick={() => showModal("factory")}><Icon type="file-add" /></Button>
                </div>
                <Tree onSelect={loadElectricData}>
                    {buildFactoryNode()}
                </Tree>
            </div>
        )
    }

    const setTime = (time) => {
        const time1 = time[0];
        const time2 = time[1];
        const startTime = time1.format("YYYY-MM-DD HH-mm-ss");
        const endTime = time2.format("YYYY-MM-DD HH-mm-ss");
        dispatch({
            type : 'data/listData',
            payload : {
                cid : data.currentCircuit,
                start : startTime,
                end : endTime
            }
        })
    }

    const render = () => {
        return (
            <div>
                <Row>
                    <Col span={4}>
                        {tree()}
                        <DataForm visible={data.modalVisible} onCancel={closeModal} type={data.modalType} modalInfo={data.modalInfo} />
                    </Col>
                    <Col span={20}>
                        <div>
                            选择时间<RangePicker renderExtraFooter={() => 'extra footer'} showTime defaultValue={[moment().add(-1, 'days'), moment()]} onOk={setTime}/>
                        </div>
                        <b/>
                        <DataGraph electricData={data.dataA} />
                        <DataGraph electricData={data.dataB} />
                        <DataGraph electricData={data.dataC} />
                    </Col>
                </Row>

            </div>
        )
    }

    return (
        <Layout content={render()} />
    )
}

export default connect(
    ({ data }) => ({ data })
)(Data);