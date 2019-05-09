import {Table, Button } from 'antd';
import { connect } from 'dva';
import Layout from './Layout';

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
        }
    ]

    const listUser = () => {
        dispatch({
            type : "user/listUsers",
            payload : {message : "hello"}
        })
    }

    const save = () => {
        dispatch({
            type : "user/save",
            payload : "hello"
        })
    }

    const renderTable = () => {
        return <Table columns={columns} dataSource={user.datas}/>
    }

    const renderButtons = () => {
        return (<div>
            <Button onClick={listUser}>refresh</Button>
            <Button onClick={save}>create</Button>
            <Button>delete</Button>
        </div>)
    }

    const render = () => {
        return <div>
            {renderButtons()}
            {renderTable()}
        </div>
    }

    return (
        <Layout content={render()}/>
    )
}

export default connect(({ user }) => ({ user }))(UserPanel);