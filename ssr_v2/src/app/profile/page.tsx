import { getServerSession } from 'next-auth/next'
import { authConfig } from '@/app/api/auth/[...nextauth]/options'

const ProfilePage = async () => {
  const session = await getServerSession(authConfig)

  return (
    <div className='bg-F5E6E0 p-4 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-2'>User Profile</h2>
      <div className='mb-4 flex flex-col'>
        <div>
          <strong>Email: </strong>
          {session?.user.user.email}
        </div>

        <div>
          <strong>ID: </strong>
          {session?.user.user.id}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
