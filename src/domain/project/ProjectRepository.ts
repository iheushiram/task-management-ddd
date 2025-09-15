import { Project } from "./Project"
import { ProjectId } from "./ProjectId"
import { UserId } from "../user/UserId"

export interface ProjectRepository {
  findById(id: ProjectId): Promise<Project | null>
  findByOwnerId(ownerId: UserId): Promise<Project[]>
  findByMemberId(memberId: UserId): Promise<Project[]>
  save(project: Project): Promise<void>
  delete(id: ProjectId): Promise<void>
}
