import type { ProjectRepository } from "../../domain/project/ProjectRepository"
import { Project } from "../../domain/project/Project"
import { ProjectId } from "../../domain/project/ProjectId"
import { UserId } from "../../domain/user/UserId"

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: Map<string, Project> = new Map()

  async findById(id: ProjectId): Promise<Project | null> {
    return this.projects.get(id.getValue()) || null
  }

  async findByOwnerId(ownerId: UserId): Promise<Project[]> {
    return Array.from(this.projects.values()).filter((project) =>
      project.getOwnerId().equals(ownerId),
    )
  }

  async findByMemberId(memberId: UserId): Promise<Project[]> {
    return Array.from(this.projects.values()).filter((project) =>
      project.isMember(memberId),
    )
  }

  async save(project: Project): Promise<void> {
    this.projects.set(project.getId().getValue(), project)
  }

  async delete(id: ProjectId): Promise<void> {
    this.projects.delete(id.getValue())
  }

  // ヘルパ
  clear(): void {
    this.projects.clear()
  }

  size(): number {
    return this.projects.size
  }
}
