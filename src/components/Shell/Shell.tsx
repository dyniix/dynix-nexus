import DynamicIsland from './DynamicIsland'
import CapsuleSidebar from './CapsuleSidebar'
import Workspace from './Workspace'

export default function Shell() {
  return (
    <div className="flex flex-col h-screen bg-nexus-900 overflow-hidden">
      <DynamicIsland />

      <CapsuleSidebar />

      <main className="flex-1 flex">
        <Workspace />
      </main>
    </div>
  )
}
