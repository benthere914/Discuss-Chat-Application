import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadServerMembers } from "../../store/members"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import './members.css'

const Members = () => {
    const params = useParams()
    const shortenUsername = (username, num=11) => {
        if (username?.length >= num){
            username = username.slice(0, num)
            username += '...'
        }
        return username
    }
    const dispatch = useDispatch()
    const members = useSelector(state => Object.values(state.members))

    useEffect(() => {
        dispatch(loadServerMembers(params?.serverId))

    }, [dispatch, params?.serverId])

    return (
    <>
        <div className='membersTab'>
            <p className='membersTitle'>{`MEMBERS - ${members?.length}`}</p>
            <ul>{members?.map((e) => (
                <li key={e?.username}>
                    <img clasname='memberIcon' src={e?.icon} alt={e?.username } onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.discordapp.com/attachments/904846014484209665/907160741671473152/v.2-white-blue-square.png"}}></img>
                    <i className='fas fa-circle memberActive' style={e?.online?{color: 'green'}:{color:'red'}}></i>
                    <p className='memberUsername'>{shortenUsername(e?.username)}</p>
                </li>))}
            </ul>
        </div>
    </>
    )
}
export default Members
