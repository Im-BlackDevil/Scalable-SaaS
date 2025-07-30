import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto, userId: string) {
    const { members, ...teamData } = createTeamDto;

    const team = await this.prisma.team.create({
      data: {
        ...teamData,
        members: {
          create: [
            {
              userId,
              role: 'OWNER',
            },
            ...(members || []).map(member => ({
              userId: member.userId,
              role: member.role || 'MEMBER',
            })),
          ],
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return team;
  }

  async findAll(userId: string) {
    return this.prisma.team.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: { links: true },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const team = await this.prisma.team.findFirst({
      where: {
        id,
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        links: {
          include: {
            _count: {
              select: { clicks: true },
            },
          },
        },
      },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto, userId: string) {
    // Check if user is team owner or admin
    const member = await this.prisma.teamMember.findFirst({
      where: {
        teamId: id,
        userId,
        role: { in: ['OWNER', 'ADMIN'] },
      },
    });

    if (!member) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.team.update({
      where: { id },
      data: updateTeamDto,
    });
  }

  async addMember(teamId: string, addMemberDto: AddMemberDto, userId: string) {
    // Check if user is team owner or admin
    const member = await this.prisma.teamMember.findFirst({
      where: {
        teamId,
        userId,
        role: { in: ['OWNER', 'ADMIN'] },
      },
    });

    if (!member) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.teamMember.create({
      data: {
        teamId,
        userId: addMemberDto.userId,
        role: addMemberDto.role || 'MEMBER',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
  }

  async removeMember(teamId: string, memberId: string, userId: string) {
    // Check if user is team owner or admin
    const member = await this.prisma.teamMember.findFirst({
      where: {
        teamId,
        userId,
        role: { in: ['OWNER', 'ADMIN'] },
      },
    });

    if (!member) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.teamMember.delete({
      where: { id: memberId },
    });
  }
} 