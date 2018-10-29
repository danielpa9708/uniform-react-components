import * as React from "react"
import { UniformComponent } from "./UniformComponent"
import { Omit } from "./type-helpers"

export type UniformOptionProps<T> = Omit<JSX.IntrinsicElements["option"], "value"> & { value: T }

export class UniformSelect<T extends string> extends UniformComponent<
  T,
  Omit<JSX.IntrinsicElements["select"], "onChange"> & { options?: UniformOptionProps<T>[] }
> {
  _UniformSelectOnChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (this.props.onChange) {
      this.props.onChange(ev.target.value as T)
    }
  }
  render() {
    return (
      <select onChange={this._UniformSelectOnChange}>
        {this.props.options &&
          this.props.options.map(prop => <option {...prop} key={prop.value} />)}
      </select>
    )
  }
}
