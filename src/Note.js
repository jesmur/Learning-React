import React, { Component } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import { FaSave } from 'react-icons/fa'

class Note extends Component{
    constructor(props){
        super(props)
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.save = this.save.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.randomBetween = this.randomBetween.bind(this)
    }

    componentWillMount(){
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
        }
    }

    randomBetween(x, y, s){
        return x + Math.ceil(Math.random() * (y-x)) + s;
    }

    edit(){
        this.setState({
            editing: true
        })
    }

    remove(){
        this.props.onRemove(this.props.index)
    }

    save(e){
        e.preventDefault();
        this.props.onChange(this._newText.value, this.props.index);
        this.setState({
            editing: false
        })
    }

    renderForm(){
        return(
            <div className="note" style={this.style}>
                <form onSubmit={this.save}>
                    <textarea ref={input => this._newText = input}
                        defaultValue={this.props.children} />
                    <button id="save"><FaSave /></button>
                </form>
            </div>
        )
    }

    renderDisplay(){
        return(
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} id="edit"><FaPen /></button>
                    <button onClick={this.remove} id="remove"><FaTrash /></button>
                </span>
            </div>
        )
    }
    render(){
        return this.state.editing ? this.renderForm() : this.renderDisplay()
    }
}

export default Note;