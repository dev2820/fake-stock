import './SimpleFriendProfile.css'

const SimpleFriendProfile = ({profile}) => {
    return (
        <div>
            <img className="name" src={profile && profile.img}/>
            <span className="status-message">{profile && profile.statusMessage}</span>
            <span className="name">{profile && profile.name}</span>
        </div>
    )
}

export default SimpleFriendProfile