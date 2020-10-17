import { verify } from '../../jwt'

async function getUserID(ctx) {
  try {
    return await verify(ctx.cookies.get('user'))
  } catch {
    return null
  }
}

export async function context({ ctx }) {
  const token = await getUserID(ctx)

  let userID = token?.user
  if (typeof userID !== 'string') userID = null
  console.log(userID)

  return { userID }
}
