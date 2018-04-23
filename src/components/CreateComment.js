import React, { PureComponent, createRef } from 'react'
import CreateCommentMutation from '../mutations/CreateCommentMutation'
import AnimateHeight from 'react-animate-height'
import { GC_USER_ID } from '../constants'
import styled from 'styled-components'
import UpdateCommentMutation from '../mutations/UpdateCommentMutation'

class CreateComment extends PureComponent {
  state = {
    editing: false,
    content: ''
  }
  commentNode = createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const { editComment } = nextProps
    if(editComment && !prevState.editing) {
      const { content } = editComment
      return {
        editing: true,
        content
      }
    }
    return null
  }
  componentDidUpdate() {
    if(this.props.mode) this.commentNode.current.focus()
  }
  render(){
    const { mode } = this.props,
    { editing, content } = this.state

    return (
      <AnimateHeight
        duration={500}
        height={mode ? 'auto' : 0}
      >
        <form onSubmit={this._handleSubmit}>
          <Input
            type='text'
            innerRef={this.commentNode}
            placeholder={`${editing ? 'Edit' : 'Add'} Comment`}
            onChange={this._handleChange}
            onBlur={this._onBlur}
            value={content}
          />
        </form>
      </AnimateHeight>
    )
  }
  _onBlur = e => {
    this.setState({
      editing: false,
      content: ''
    }, this.props.handleBlur(e))
  }
  _handleChange = e => {
    const target = e.target || e.srcElement,
    content = target && target.value
    this.setState({ content })
  }
  _handleSubmit = e => {
    e.preventDefault()
    const commentedById = localStorage.getItem(GC_USER_ID),
    { content, editCommentId } = this.state,
    {
      commentedPostId,
      editComment,
      viewerId,
      userName
    } = this.props,
    target = e.target || e.srcElement,
    targetInput = target && target.querySelector('input')

    if(editCommentId) UpdateCommentMutation(
      content,
      editComment,
      viewerId,
      () => this._onBlur(targetInput)
    )

    else CreateCommentMutation(
      content,
      commentedById,
      userName,
      commentedPostId,
      viewerId,
      () => this._onBlur(targetInput)
    )
  }
}

export default CreateComment

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  box-sizing: border-box;
`
