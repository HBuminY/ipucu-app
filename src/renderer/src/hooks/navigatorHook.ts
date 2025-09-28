import { useNavigate, NavigateOptions } from 'react-router-dom'
import { AppRoutes } from '@renderer/routes'

export const useTypedNavigate = () => {
  const navigate = useNavigate()

  return (to: AppRoutes, options?: NavigateOptions) => {
    let newTo = '/'
    if (to != '/') {
      newTo = `/${to}`
    }
    navigate(newTo, options)
  }
}
