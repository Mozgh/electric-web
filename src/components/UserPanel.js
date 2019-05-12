import {Table, Button, Icon } from 'antd';
import { connect } from 'dva';
import Layout from './Layout';
import UserForm from './UserForm';

const UserPanel = ({ dispatch, user }) => {

    const columns = [
        {
            title : '姓名',
            dataIndex : 'name',
            key : 'name'
        },
        {
            title : '用户名',
            dataIndex : "username",
            key : 'username'
        },
        {
            title : '邮箱',
            dataIndex : "email",
            key : "email"
        },
        {
            title : '手机号',
            dataIndex : "phone",
            key : "phone"
        },
        {
            title : "操作",
            dataIndex : "operation",
            key : "operation",
            render : (text, record) => {
                return (<div>
                    <Button>
                        <Icon type="edit" />
                    </Button>
                    <Button type="danger" onClick={() => deleteUser(record.id)} >
                        <Icon type="delete" />
                    </Button>
                </div>)
            }
        }
    ]

    const listUser = () => {
        dispatch({
            type : "user/listUsers",
            payload : {message : "hello"}
        })
    }

    const showCreateDrawer = () => {
        dispatch({
            type : "user/setCreateVisible",
            payload : {visible : true}
        })
    }

    const deleteUser = (id) => {
        console.log(id);
        dispatch({
            type : "user/deleteUser",
            payload : {id : id}
        }).then(err => {
                if (!err) {
                    listUser();
                }
            })
        
    }

    const renderTable = () => {
        return <Table columns={columns} dataSource={user.users} rowKey={'id'}/>
    }

    const renderButtons = () => {
        return (<div>
            <Button onClick={listUser}><Icon type="reload" />刷新</Button>
            <Button onClick={showCreateDrawer}><Icon type="user-add" />新建</Button>
        </div>)
    }

    const render = () => {
        return <div>
            {renderButtons()}
            {renderTable()}
            <UserForm />
        </div>
    }

    return (
        <Layout content={render()}/>
    )
}

export default connect(({ user }) => ({ user }))(UserPanel);