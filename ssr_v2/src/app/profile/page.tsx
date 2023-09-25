import { getServerSession } from 'next-auth/next'
import { authConfig } from '@/app/api/auth/[...nextauth]/options'

const ProfilePage = async () => {
  const session = await getServerSession(authConfig)

  console.log('ProfilePage getServerSession', session)

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
