import React, { useState, useReducer, useEffect } from 'react'
import axios from 'axios'
const initState = {
  loading: false,
  error: null,
  data: {}
}
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "init":
      return {
        loading: true,
        error: null,
        data: {}
      };
    case "error":
      return {
        loading: false,
        error: payload,
        data: {}
      }
    case "success":
      return {
        loading: false,
        error: null,
        data: payload
      }
    default:
      return {
        loading: false,
        error: null,
        data: {}
      }
  }
}
export default ({ api_, payload } = {}) => {
  const [api, setApi] = useState(api_)
  const [state, dispatch] = useReducer(reducer, initState)
  async function getData() {
    try {
      if (api) {
        dispatch({ type: 'init' })
        const res = await axios.get(api)
        if (res.status === 200 && res.data) {
          dispatch({ type: 'success', payload: res.data })
        }
      }
    } catch (e) {
      dispatch({ type: 'error', payload: e })
    }
  }
  useEffect(() => {
    getData()
  }, [api])
  return [state, setApi]
}
