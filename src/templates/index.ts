export const createDto = `
export class Create!module!Dto {
}
`;
export const updateDto = `
import { PartialType } from '@nestjs/swagger';
import { Create!module!Dto } from './create-<parent>.dto';
export class Update!module!Dto extends PartialType(Create!module!Dto) {}
`;
export const entity = `
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity } from 'typeorm';

@Entity('<entity>', { schema: 'public' })
export class !module! extends BaseEntity {
}
`;
export const serviceInterface = `
export const I!module!Service = Symbol('I!module!Service');
export interface I!module!Service {
}
`;
export const mapping = `
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Create!module!Dto } from '../dto/create-<parent>.dto';
import { !module! } from '../entities/<parent>.entity';

@Injectable()
export class !module!MappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, !module!, Create!module!Dto);
      createMap(mapper, Create!module!Dto, !module!);
    };
  }
}
`;
export const repository = `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ORDER_BY } from 'src/common/constants/enums';
import { FindOptionsBuilder } from 'src/common/database/builder-pattern/find-options.builder';
import { BaseRepository } from 'src/common/database/repositories/base/base.repository';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { PagedList } from 'src/common/types/paged-list';
import { Repository } from 'typeorm';
import { AppContext } from '../../../common/interfaces/context';
import { !module! } from '../entities/<parent>.entity';
import { I!module!Repository } from './interface/<parent>-repository.interface';

@Injectable()
export class !module!Repository
  extends BaseRepository<!module!>
  implements I!module!Repository
{
  constructor(
    @InjectRepository(!module!)
    public readonly repository: Repository<!module!>,
  ) {
    super(repository);
  }

  async findAll(
    paginationDto: PaginationDto,
    ctx: AppContext,
  ): Promise<PagedList<!module!>> {
    const findOption = new FindOptionsBuilder<!module!>()
      .where({
        deletedAt: null })
      .order({ id: ORDER_BY.DESC })
      .build();
    return this.findWithPagination(paginationDto, findOption);
  }
}

`;
export const repositoryInterface = `
import { IBaseRepository } from 'src/common/database/repositories/interfaces/base.interface';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { PagedList } from 'src/common/types/paged-list';
import { !module! } from '../../entities/<parent>.entity';
import { AppContext } from '../../../../common/interfaces/context';

export const I!module!Repository = Symbol(
  'I!module!Repository',
);

type DefaultEntity = !module!;
export interface I!module!Repository<T = DefaultEntity>
  extends IBaseRepository<T> {
    findAll(
    paginationDto: PaginationDto,
    ctx: AppContext,
  ): Promise<PagedList<!module!>>;
}
`;

export const controller = `
import { Controller, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DOMAIN_ENTITY, JWT, X_API_KEY } from 'src/common/constants';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { I!module!Service } from './interfaces/<parent>.interface';

@ApiTags(DOMAIN_ENTITY.NOTIFICATIONS)
@ApiBearerAuth(X_API_KEY)
@UseGuards(ApiKeyGuard)
@ApiBearerAuth(JWT)
@UseGuards(AuthGuard)
@Controller('<paren>')
export class !module!Controller {
  constructor(
    @Inject(I!module!Service)
    private readonly <module>Service: I!module!Service,
  ) {}

// @Post()
// create(@Body() create!module!Dto: Create!module!Dto) {
//   return this.<module>Service.create(create!module!Dto);
// }

 // @Get()
 // findAll(
 //   @Query() paginationDto: PaginationDto,
 //   @Context() context: AppContext,
 // ) {
 //   return this.<module>Service.findAll(paginationDto, context);
 // }

  // @Get(':id')
  // findOne(@Param() idDto: IdDto) {
  //   const { id } = idDto;
  //   return this.<module>Service.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param() idDto: IdDto, @Body() update!module!Dto: Update!module!Dto) {
  //   const { id } = idDto;

  //   return this.<module>Service.update(+id, update!module!Dto);
  // }

  // @Delete(':id')
  // remove(@Param() idDto: IdDto) {
  //   const { id } = idDto;

  //   return this.<module>Service.remove(+id);
  // }
}
`;
export const moduleContent = `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { !module! } from './entities/<parent>.entity';
import { I!module!Service } from './interfaces/<parent>.interface';
import { !module!MappingProfile } from './mapping/<parent>.mapping';
import { !module!Controller } from './<parent>.controller';
import { I!module!Repository } from './repositories/interface/<parent>-repository.interface';
import { !module!Repository } from './repositories/<parent>.repository';
import { !module!Service } from './<parent>.service';

const <module>Entities = [!module!];
const <module>RepositoryProvider = [
  {
    provide: I!module!Repository,
    useClass: !module!Repository,
  },
];
const <module>ServiceProvider = [
  {
    provide: I!module!Service,
    useClass: !module!Service,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature(<module>Entities)],
  controllers: [!module!Controller],
  providers: [
    ...<module>ServiceProvider,
    ...<module>RepositoryProvider,
    !module!MappingProfile,
  ],
  exports: [...<module>ServiceProvider],
})
export class !module!Module {}
`;
export const service = `
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { RESPONSE_MESSAGES } from '../../common/constants';
import { PaginationDto } from '../../common/dtos/request/pagination.dto';
import { AppContext } from '../../common/interfaces/context';
import { Create!module!Dto } from './dto/create-<parent>.dto';
import { Update!module!Dto } from './dto/update-<parent>.dto';
import { !module! } from './entities/<parent>.entity';
import { I!module!Service } from './interfaces/<parent>.interface';
import { I!module!Repository } from './repositories/interface/<parent>-repository.interface';

@Injectable()
export class !module!Service implements I!module!Service {
  constructor(
    @Inject(I!module!Repository)
    private readonly <module>Repository: I!module!Repository,
    @InjectMapper() private readonly <module>Mapper: Mapper,
  ) {}

   async create(create!module!Dto: Create!module!Dto) {
     const new!module! = this.<module>Mapper.map(create!module!Dto, Create!module!Dto, !module!);
     return this.<module>Repository.create(new!module!);
   }

  findAll(paginationDto: PaginationDto, ctx: AppContext) {
    return this.<module>Repository.findAll(paginationDto, ctx);
  }

   findOne(id: number) {
     return this.<module>Repository.findOne({ id });
   }

  async update(id: number, update!module!Dto: Update!module!Dto) {
    const <module>Update = this.<module>Mapper.map(
      update!module!Dto,
      Create!module!Dto,
      !module!,
    );
    await this.<module>Repository.update({ id }, <module>Update);
    return RESPONSE_MESSAGES.UPDATED;
  }

   async remove(id: number) {
     await this.<module>Repository.softDelete({ id });
     return RESPONSE_MESSAGES.DELETED;
   }
}

`;
