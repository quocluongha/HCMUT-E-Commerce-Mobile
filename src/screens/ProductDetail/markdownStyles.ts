import { Platform, StyleSheet } from 'react-native'

export const markdownStyles = StyleSheet.create({
  // The main container
  body: {
    color: '#000000',
  },

  // Headings
  heading1: {
    flexDirection: 'row',
    fontSize: 32,
    color: '#000000',
  },
  heading2: {
    flexDirection: 'row',
    fontSize: 24,
    color: '#000000',
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 18,
    color: '#000000',
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 16,
    color: '#000000',
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 13,
    color: '#000000',
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 11,
    color: '#000000',
  },

  // Horizontal Rule
  hr: {
    backgroundColor: '#000000',
    height: 1,
  },

  // Emphasis
  strong: {
    fontWeight: 'bold',
    color: '#000000',
  },
  em: {
    fontStyle: 'italic',
    color: '#000000',
  },
  s: {
    color: '#000000',
    textDecorationLine: 'line-through',
  },

  // Blockquotes
  blockquote: {
    color: '#000000',
    backgroundColor: '#F5F5F5',
    borderColor: '#CCC',
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5,
  },

  // Lists
  bullet_list: {
    color: '#000000',
  },
  ordered_list: {
    color: '#000000',
  },
  list_item: {
    color: '#000000',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_icon: {
    color: '#000000',
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_content: {
    color: '#000000',
    flex: 1,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_icon: {
    color: '#000000',
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_content: {
    color: '#000000',
    flex: 1,
  },

  // Code
  code_inline: {
    color: '#000000',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  code_block: {
    color: '#000000',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  fence: {
    color: '#000000',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },

  // Tables
  table: {
    color: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
  },
  thead: {
    color: '#000000',
  },
  tbody: {
    color: '#000000',
  },
  th: {
    color: '#000000',
    flex: 1,
    padding: 5,
  },
  tr: {
    color: '#000000',
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  td: {
    color: '#000000',
    flex: 1,
    padding: 5,
  },

  // Links
  link: {
    color: '#428bca',
    textDecorationLine: 'underline',
  },
  blocklink: {
    color: '#428bca',
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },

  // Images
  image: {
    color: '#000000',
    flex: 1,
  },

  // Text Output
  text: {
    // color: '#000000',
  },
  textgroup: {
    color: '#000000',
  },
  paragraph: {
    color: '#000000',
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  hardbreak: {
    color: '#000000',
    width: '100%',
    height: 1,
  },
  softbreak: {
    color: '#000000',
  },

  // Believe these are never used but retained for completeness
  pre: {
    color: '#000000',
  },
  inline: {
    color: '#000000',
  },
  span: {
    color: '#000000',
  },
})
