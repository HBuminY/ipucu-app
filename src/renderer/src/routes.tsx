import Home from './pages/home'
import Spaces from './pages/spaces'
import Layout from './components/Layout'
import NewSpace from './pages/newSpace'
import EditSpace from './pages/editSpace'

const routedPages = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'spaces',
        element: <Spaces />
      },
      {
        path: 'new-space',
        element: <NewSpace />
      }
    ]
  },
  {
    path: '/edit-spaces/',
    element: <Layout />,
    children: [
      { index: true, element: <div className="text-black">this is edit spaces page</div> },
      { path: ':spaceId', element: <EditSpace /> }
    ]
  }
] as const

export type AppRoutes = {
  [K in keyof typeof routedPages]: (typeof routedPages)[K] extends infer T
    ? T extends { path: string; children: readonly unknown[] }
      ? T['children'][number] extends infer C
        ? C extends { path: string }
          ? C['path']
          : C extends { index: true }
            ? T['path']
            : never
        : never
      : T extends { path: string }
        ? T['path']
        : never
    : never
}[keyof typeof routedPages]

export default routedPages
