import { getServerSession } from 'next-auth/next'
import { authConfig } from '@/config/auth'

const ProfilePage = async () => {
  const session = await getServerSession(authConfig)
  return (
    <div>
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && (
        <img
          src={session.user.image}
          alt='avatar'
        />
      )}
    </div>
  )
}

export default ProfilePage
