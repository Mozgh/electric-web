import { Modal, Form, Input, Icon, Upload, Button } from "antd";
import { connect } from 'dva';

const DataForm = ({ dispatch, form, visible, onCancel, type, modalInfo }) => {

    const formItemLayout = {
        labelCol : {
            xs : { span : 6 },
            sm : { span : 6 },
            md : { span : 6 },
        },
        wrapperCol : {
            xs : { span : 18 },
            sm : { span : 18 },
            md : { span : 18 },
        },
    };

    const { getFieldDecorator } = form;

    const downloadTemplate = () => {
        dispatch({
            type : 'data/downloadTemplate'
        })
    }

    const onSubmit = () => {
        form.validateFields((err, values) => {
            switch (type) {
                case "factory":
                    dispatch({
                        type : "data/createFactory",
                        payload : values
                    }).then(error => {
                        if (!error) {
                            onCancel();
                            dispatch({
                                type : 'data/listFactory'
                            })
                        }
                    });
                    break;
                case "workshop":
                    dispatch({
                        type : "data/createWorkshop",
                        payload : {
                            factoryId : modalInfo,
                            ...values
                        }
                    }).then(error => {
                        if (!error) {
                            onCancel();
                            dispatch({
                                type : 'data/listFactory'
                            })
                        }
                    });
                    break;
                case "circuit":
                    dispatch({
                        type : "data/createCircuit",
                        payload : {
                            workshopId : modalInfo,
                            ...values
                        }
                    }).then(error => {
                        if (!error) {
                            onCancel();
                            dispatch({
                                type : 'data/listFactory'
                            })
                        }
                    });
                    break;
            }
        })
    }

    let title;
    switch (type) {
        case "factory": this.title = "新建工厂"; break;
        case "workshop": this.title = "新建车间"; break;
        case "circuit": this.title = "新建线路"; break;
        case "data": this.title = "上传数据"; break;
    }

    const renderForm = () => {
        switch (type) {
            case "factory":
                return (
                    <Form>
                        <Form.Item {...formItemLayout} label={"名称"}>
                            {getFieldDecorator('name', {
                                rules : [{
                                    required : true,
                                    message : "名称不能为空"
                                }]
                            })(<Input />)}</Form.Item>
                        <Form.Item {...formItemLayout} label={"描述"}>
                            {getFieldDecorator('description')(<Input />)}</Form.Item>
                    </Form>
                );
            case "workshop": this.title = "";
                return (
                    <Form>
                        <Form.Item {...formItemLayout} label={"名称"}>
                            {getFieldDecorator('name', {
                                rules : [{
                                    required : true,
                                    message : "名称不能为空"
                                }]
                            })(<Input />)}</Form.Item>
                        <Form.Item {...formItemLayout} label={"描述"}>
                            {getFieldDecorator('description')(<Input />)}</Form.Item>
                    </Form>
                );
            case "circuit":
                this.title = "新建线路";
                return (
                    <Form>
                        <Form.Item {...formItemLayout} label={"名称"}>
                            {getFieldDecorator('name', {
                                rules : [{
                                    required : true,
                                    message : "名称不能为空"
                                }]
                            })(<Input />)}</Form.Item>
                    </Form>
                );
            case "data":
                return (
                    <div>
                        <Button onClick={downloadTemplate}><Icon type="download"></Icon>下载模板</Button>
                        <Upload />
                    </div>
                )
        }

    }

    return (
        <Modal title={title} visible={visible} title={this.title} onCancel={onCancel} onOk={onSubmit}>
            {renderForm()}

        </Modal>
    )
}

export default Form.create()(connect(({ data }) => ({ data }))(DataForm));