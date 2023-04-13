export const appendBearerToken = (token: string) => ({
  Authorization: `Bearer ${token}`,
})
