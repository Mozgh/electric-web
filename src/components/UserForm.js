import { Drawer, Form, Input, Row, Col, Button } from "antd";
import { connect } from "dva";

const UserForm = ({dispatch, user, form}) => {
    const closeDrawer = () => {
        dispatch({
            type : 'user/setCreateVisible',
            payload : {
                visible : false
            }
        })
    }

    const submit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type : 'user/createUser',
                    payload : values
                }).then(error => {
                    if (!error) {
                        closeDrawer();
                        dispatch({
                            type : 'user/listUsers'
                        })
                    }
                })
            }
        })
    }

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

    const comparePassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback("两次输入密码不一致！");
        } else {
            callback();
        }
    }

    return (
        <Drawer visible={user.createVisible} closable={true} destroyOnClose={true} title={"添加用户"} onClose={closeDrawer} width={512}>
            <Form>
                <Form.Item {...formItemLayout} label={"用户名"}>
                    {getFieldDecorator('username', {
                        rules : [{
                            required : true,
                            message : "用户名不能为空"
                        }]
                   })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label={"密码"}>
                    {getFieldDecorator('password', {
                        rules : [{
                            required : true,
                            message : "密码不能为空"
                        }]
                   })(<Input type={'password'}/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label={"确认密码"}>
                    {getFieldDecorator('confirmPassword', {
                        rules : [{
                            required : true,
                            message : "密码不能为空"
                        },
                        {
                            validator : comparePassword
                        }
                    ]
                   })(<Input type={'password'}/>)}
                </Form.Item>
                
                <Form.Item {...formItemLayout} label={"姓名"}>
                    {getFieldDecorator('name', {
                        rules : [{
                            required : true,
                            message : "姓名不能为空"
                        }]
                   })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label={"邮箱"}>
                    {getFieldDecorator('email', {
                        rules : [{
                            pattern :
                              '^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$',
                            message : "邮箱格式错误" 
                          }]
                   })(<Input />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label={"手机号码"}>
                    {getFieldDecorator('phone', {
                        rules : [{
                            pattern : '^1[34578]\\d{9}$',
                            message : "手机号码格式错误"
                          }]
                   })(<Input />)}
                </Form.Item>
                <Row>
                    <Col span={2} offset={6}>
                        <Button type="default" onClick={closeDrawer}>取消</Button>
                    </Col>
                    <Col span={4} offset={8}>
                        <Button type="primary" onClick={submit}>提交</Button>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
}

export default Form.create() (
    connect(({ user }) => ({ user }))(UserForm)
)