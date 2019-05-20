import Layout from "./Layout";
import DataGraph from './DataGraph';
import { Select, Tree, Icon, Button, Row, Col } from "antd";
import {connect} from 'dva';

const {TreeNode} = Tree;

const Data = ({dispatch, data}) => {

    const renderSelect = () => {
        return (<Select />)
    }

    const reload = () => {
        dispatch({
            type : 'data/listFactory'
        });
    }

    const loadElectricData = (circuitId) => {
        dispatch({
            type : 'data/listData',
            payload : circuitId
        })
    }

    const buildFactoryNode = () => {
        const {factory} = data;
        let treeNode = [];
        if (factory == null || factory == undefined) {
            factory.map(f => {
                const {workshops} = f;
                treeNode.push(
                    <TreeNode title={f.name} key={f.id}>
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
        if (workshops) {
            workshops.map(w => {
                workshopNodes.push(
                    <TreeNode title={w.name} key={w.id + w.name}>
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
                    <TreeNode title={c.name} key={c.id + c.name}></TreeNode>
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
                <Tree>
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