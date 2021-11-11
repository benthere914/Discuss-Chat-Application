import md5 from "md5"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadServerMembers } from "../../store/members"
import { useDispatch } from "react-redux"
import './members.css'

const Members = () => {
    const shortenUsername = (username, num=15) => {
        if (username?.length >= num){
            username = username.slice(0, num)
            username += '...'
        }
        return username
    }
    const dispatch = useDispatch()
    const members = useSelector(state => Object.values(state.members))
    useEffect(() => {
        dispatch(loadServerMembers(1))

    }, [])

    return (
    <>
        <div className='membersTab'>
            <p className='membersTitle'>{`Members - ${members.length}`}</p>
            <ul>{members?.map((e) => (
                <li key={e.username}>
                    <img clasname='memberIcon' src={`https://www.gravatar.com/avatar/${md5(e.email)}`} alt={e.username}></img>
                    <i className='fas fa-circle memberActive' style={e.online?{color: 'green'}:{color:'red'}}></i>
                    <p className='memberUsername'>{shortenUsername(e.username)}</p>
                </li>))}
            </ul>
        </div>
    </>
    )
}
export default Members
