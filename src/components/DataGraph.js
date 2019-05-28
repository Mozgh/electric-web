import {Row, Col} from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from "bizcharts";
import DataSet from "@antv/data-set";
import moment from 'moment';
const DataGraph = ({electricData}) => {

  const ds = new DataSet();
  const dv1 = ds.createView().source(electricData);
  dv1.transform({
    type : "fold",
    fields : ["electricity"],
    // 展开字段集
    key : "city",
    // key字段
    value : "electricity" // value字段
  });
  const dv2 = ds.createView().source(electricData);
  dv2.transform({
    type : "fold",
    fields : ["voltage"],
    // 展开字段集
    key : "city",
    // key字段
    value : "voltage" // value字段
  });
  const cols = {
    month : {
      range : [0, 1]
    }
  };
  return (
    <div>
      <Row>
        <Col span={12}>
          <Chart height={300} data={dv1} scale={cols} forceFit>
          <Legend />
          <Axis 
            name="time"
            label={{
              formatter : time => moment(time).format("HH:mm:ss")
            }}
          />
          <Axis
            name="electricity"
            label={{
              formatter : val => `${val}A`
            }}
          />
          <Tooltip
            crosshairs={{
              type : "y"
            }}
          />
          <Geom
            type="line"
            position="time*electricity"
            size={2}
            color={"city"}
          />
          <Geom
            type="point"
            position="time*electricity"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke : "#fff",
              lineWidth : 1
            }}
          />
          </Chart>
        </Col>
        <Col  span={12}>
          <Chart height={300} data={dv2} scale={cols} forceFit>
          <Legend />
          <Axis 
            name="time"
            label={{
              formatter : time => moment(time).format("HH:mm:ss")
            }}
          />
          <Axis
            name="voltage"
            label={{
              formatter : val => `${val}V`
            }}
          />
          <Tooltip
            crosshairs={{
              type : "y"
            }}
          />
          <Geom
            type="line"
            position="time*voltage"
            size={2}
            color={"city"}
          />
          <Geom
            type="point"
            position="time*voltage"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke : "#fff",
              lineWidth : 1
            }}
          />
          </Chart>
        </Col>
      </Row>
      
    </div>
  );
}

export default DataGraph;