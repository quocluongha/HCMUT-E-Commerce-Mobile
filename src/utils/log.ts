import reactotron from 'reactotron-react-native'

export const log = (name: string = 'LOG', ...args: any[]) => {
  console.log(...args)
  reactotron.display({
    name: name,
    value: args,
    preview: JSON.stringify(args),
  })
}
