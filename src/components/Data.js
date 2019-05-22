import Layout from "./Layout";
import DataGraph from './DataGraph';
import { Select, Tree, Icon, Button, Row, Col } from "antd";
import {connect} from 'dva';
import moment from 'moment';

const {TreeNode} = Tree;

const Data = ({dispatch, data}) => {

    const reload = () => {
        dispatch({
            type : 'data/listFactory'
        });
    }

    const loadElectricData = (selectedKeys, {selectedNodes}) => {
        console.log(selectedNodes);
        const node = selectedNodes[0];
        const {props} = node;
        const {dataRef} = props;
        const {id} = dataRef;
        
        dispatch({
            type : 'data/listData',
            payload : {
                cid : id,
                start : "2018-07-31 16:00:00",
                end : "2018-07-31 20:00:00",
                phase : "A"
            }
        })
    }

    const buildFactoryNode = () => {
        const {factory} = data;
        let treeNode = [];
        if (factory) {
            factory.map(f => {
                const {workshops} = f;
                console.log(f);
                treeNode.push(
                    <TreeNode title={f.name} key={f.id} selectable={false}>
                        {
                            buildWorkshopNode(workshops)
                        }
                    </TreeNode>
                )
            })
        }
        console.log(treeNode);
        return treeNode;
    }

    const buildWorkshopNode = (workshops) => {
        let workshopNodes = [];
        if (workshops) {
            workshops.map(w => {
                workshopNodes.push(
                    <TreeNode title={w.name} key={w.id + w.name} selectable={false}>
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
        console.log(circuits);
        let circuitNodes = [];
        if (circuits) {
            circuits.map(c => {
                circuitNodes.push(
                    <TreeNode title={c.name} key={c.id + '_' + c.name} selectable={true} dataRef={c}></TreeNode>
                )
            })
        }
        return circuitNodes;
    }

    const tree = () => {
        return (
        <div>
            <div>
                <Button onClick={reload}><Icon type="reload" /></Button>
            </div>
                <Tree onSelect={loadElectricData}>
                    {buildFactoryNode()}
                </Tree>
        </div>
        )
    }

    const render = () => {
        return (
            <div>
                <Row>
                    <Col span={4}>
                        {tree()}
                    </Col>
                    <Col span={20}>
                        <DataGraph />
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
    ({data}) => ({data})
)(Data);