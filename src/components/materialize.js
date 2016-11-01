import React from 'react'
import AdapterType from '../adapters/adapter-type'

export default function materialize (componentName, ComponentConstructor) {
  return React.createClass({
    displayName: `Entanglement.materialize.${componentName}`,

    contextTypes: {
      entanglement: AdapterType
    },

    getInitialState () {
      return {
        isMounted: false,
        props: {}
      }
    },

    componentDidMount () {
      const { materializer } = this.context.entanglement

      this.dismissers = [
        materializer.addRenderListener(this.props.name, this.handleRender),
        materializer.addUnmountListener(this.props.name, this.handleUnmount)
      ]
    },

    componentWillUnmount () {
      this.dismissers.forEach((dismisser) => dismisser())
      this.dismissers = []
    },

    handleUnmount () {
      this.setState({ isMounted: false })
    },

    handleRender (data, handlerNames) {
      const { materializer } = this.context.entanglement

      const buildHandler = (name) => (...args) => (
        materializer.handle(this.props.name, name, args)
      )

      const props = {
        ...data,
        ...handlerNames.reduce((acc, name) => (
          { ...acc, [name]: buildHandler(name) }
        ), {})
      }

      this.setState({ isMounted: true, props })
    },

    render () {
      const { isMounted, props } = this.state
      return isMounted && <ComponentConstructor {...props} />
    }
  })
}
