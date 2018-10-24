# uniform-react-components

[![Travis](https://travis-ci.org/LeDDGroup/uniform-react-components.svg?branch=master)](https://travis-ci.org/LeDDGroup/uniform-react-components)
[![npm version](https://img.shields.io/npm/v/uniform-react-components.svg "test")](https://www.npmjs.com/package/uniform-react-components)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![linter: lynt](https://img.shields.io/badge/linter-lynt-E81AAF.svg)](https://github.com/saadq/lynt)

Components with the same simple interface to handle onChange events on react components

Also exports Input components using this pattern to help with implementation of forms and such

This modules helps you achieve this

```tsx
import * as React from "react"

interface ISimpleData {
  age: number
  password: string
  username: string
}
class SimpleComponent extends React.Component<{
  onChange: (newData: ISimpleData) => void
  age: number
  password: string
  username: string
}> {
  data = {
    age: this.props.age,
    password: this.props.password,
    username: this.props.username,
  }
  onChangeAge = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.data.age = parseInt(ev.target.value)
    this.props.onChange(this.data)
  }
  onChangePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.data.password = ev.target.value
    this.props.onChange(this.data)
  }
  onChangeUsername = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.data.username = ev.target.value
    this.props.onChange(this.data)
  }
  render() {
    return (
      <form>
        <input onChange={this.onChangeUsername} defaultValue={this.props.username} />
        <input
          onChange={this.onChangePassword}
          type="password"
          defaultValue={this.props.password}
        />
        <input onChange={this.onChangeAge} type="number" defaultValue={this.props.age.toString()} />
      </form>
    )
  }
}
```

with much less code and same performance:

```tsx
import { UniformComponent, UniformInput, UniformInputNumber } from "uniform-react-components"

interface ISimpleData {
  age: number
  password: string
  username: string
}
class SimpleUniform extends UniformComponent<ISimpleData> {
  render() {
    return (
      <form>
        <UniformInput
          onChange={this.onChange.username}
          defaultValue={this.props.defaultValue.username}
        />
        <UniformInput
          type="password"
          onChange={this.onChange.password}
          defaultValue={this.props.defaultValue.password}
        />
        <UniformInputNumber
          type="number"
          onChange={this.onChange.age}
          defaultValue={this.props.defaultValue.age}
        />
      </form>
    )
  }
}
```

## Features

- Generate efficient onChange handlers, so you don't have to make every one of them manually
- Easy form creation with components with the same interface
- Great typescript support

## Input helpers

uniform-react-components exports two input helpers ( _UniformInput_ and _UniformInputNumber_ )that have the same interface, it only changes the _onChange_ ( and _defaultValue_ which is the case of _UniformInputNumber_ ) properties, and accepts all the properties of a plain `input` element. This only saves you the trouble of implementing these components, but you could implement them if you want to, and even add some more.

### UniformInput

The same as the plain input element, but the onChange property returns an string instead of a change input event

```tsx
<UniformInput
  onChange={newValue => console.log(`This is my value ${newValue}`)} // newValue is string
  defaultValue="hello"
  // you can add all the other properties such as type, className, style...
/>
```

### UniformInputNumber

The same as the plain input element, but the onChange property returns an _number_ instead of a change input event, and the defaultValue accepts an number too. You must still set the `type="number"` property if you want a number input

```tsx
<UniformInputNumber
  onChange={newValue => console.log(`This is my value ${newValue}`)} // newValue is number
  defaultValue={3} // typescript complains if it's string
  type="number"
  // you can add all the other properties such as className, style...
/>
```

## UniformComponent

The UniformComponent is the main component of uniform-react-components, it's a base class which is used to make simple components for handling forms and subforms, or anything that holds a value and can be changed.

All UniformComponent exports the same interface `{ onChange: Data; defaultValue: Data }`, where Data is a type of the value the component holds. The component will have a member predefined with the onChange handlers of all the possible keys of the Data type.

For example, for this type

```ts
interface ISimpleData {
  age: number
  password: string
  username: string
}
```

The component will generate handlers like if you did:

```tsx
this.onChange = {
  age: newAge => {
    /* dispatch this.props.onChange({ ...previousData, age: newAge })*/
  },
  password: newPassword => {
    /* dispatch this.props.onChange({ ...previousData, password: newPassword })*/
  },
  username: newUsername => {
    /* dispatch this.props.onChange({ ...previousData, username: newUsername })*/
  },
}
```

Full example:

```tsx
interface ISimpleData {
  age: number
  password: string
  username: string
}
class SimpleUniform extends UniformComponent<ISimpleData> {
  render() {
    return (
      <form>
        <UniformInput
          onChange={this.onChange.username}
          defaultValue={this.props.defaultValue.username}
        />
        <UniformInput
          type="password"
          onChange={this.onChange.password}
          defaultValue={this.props.defaultValue.password}
        />
        <UniformInputNumber
          type="number"
          onChange={this.onChange.age}
          defaultValue={this.props.defaultValue.age}
        />
      </form>
    )
  }
}
```
