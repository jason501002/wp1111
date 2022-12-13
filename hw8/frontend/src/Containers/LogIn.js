import {Input} from 'antd';
import {UserOutlined} from '@ant-design/icons'
import Title from './Title'

const LogIn =({me, setMe, setSignedIn, displayStatus}) => {
    return (
        <>
            <Title me={me}/>
            <Input.Search
            size="larger"
            style={{width: 300, margin: 50}}
            prefix={<UserOutlined />}
            placeholder="Enter your name"
            value={me}
            enterButton="Sign In"
            onChange={e => setMe(e.target.value)}
            onSearch={(names) => {
                if(!names){
                    displayStatus({
                        type: 'error',
                        message: 'please enter a name',
                    })
                }
                else{
                    setSignedIn(true)
                }
            }}
            ></Input.Search>
        </>
    )       
}

export default LogIn;