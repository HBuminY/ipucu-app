const DB = {
  createNewSpace: async (title: string, description?: string) => {
    // return await db
    //   .insertInto('spaces')
    //   .values({ title, description })
    //   .returningAll()
    //   .executeTakeFirstOrThrow()
  },
  getAllSpaces: async () => {
    return await db.selectFrom('spaces').selectAll().execute()
  }
}
const System = {
  getSystemInfo: () => {
    return {
      platform: process.platform,
      nodeVersion: process.version,
      timestamp: Date.now()
    }
  },
  openPath: (path: string) => {
    // Simulate opening a path
    return { opened: path, success: true }
  }
}

export const exposedUtilities = {
  ...DB,
  ...System
} as const

// Create a type that maps function names to their exact signatures
export type ExposedUtilities = typeof exposedUtilities

// Extract function names
export type ExposedUtilityNames = keyof ExposedUtilities

// Create a type that maps function names to their parameter types
export type ExposedUtilityParams = {
  [K in ExposedUtilityNames]: ExposedUtilities[K] extends (...args: infer P) => unknown ? P : never
}

// Create a type that maps function names to their return types
export type ExposedUtilityReturns = {
  [K in ExposedUtilityNames]: ExposedUtilities[K] extends (...args: unknown[]) => infer R
    ? R
    : never
}

// Helper type for the IPC handler to get proper typing
export type CallFunctionHandler = <T extends ExposedUtilityNames>(
  event: Electron.IpcMainInvokeEvent,
  functionName: T,
  ...args: ExposedUtilityParams[T]
) => ExposedUtilityReturns[T]
