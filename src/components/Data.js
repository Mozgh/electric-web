import Layout from "./Layout";
import DataGraph from './DataGraph';
import { Select } from "antd";

const Data = () => {

    const renderSelect = () => {
        return (<Select />)
    }

    const render = () => {
        return (
            <div>
                选择工厂
                {renderSelect()}
                选择车间
                {renderSelect()}
                <DataGraph />
            </div>
        )
    }

    return (
        <Layout content={render()} />
    )
}

export default Data;