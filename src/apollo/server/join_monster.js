export const joinMonsterCfg = {
  Query: {
    fields: {
      users: {
        sqlPaginate: true,
        orderBy: {
          user_id: 'asc'
        }
      },
      user: {
        where: (table, args) => `${table}.user_id = ${args.id}`
      },
      magnets: {
        sqlPaginate: true,
        orderBy: {
          magnet_id: 'asc'
        }
      },
      magnet: {
        where: (table, args) => `${table}.magnet_id = ${args.id}`
      },
      magnet_types: {
        sqlPaginate: true,
        orderBy: {
          magnet_type_id: 'asc'
        }
      },
      magnet_type: {
        where: (table, args) => `${table}.magnet_type_id = ${args.id}`
      }
    }
  },
  User: {
    sqlTable: 'users',
    uniqueKey: 'user_id',
    fields: {
      email: {
        sqlColumn: 'email'
      },
      nick: {
        sqlColumn: 'nick'
      },
      id: {
        sqlColumn: 'user_id'
      }
    }
  },
  Magnet: {
    sqlTable: 'magnets',
    uniqueKey: 'magnet_id',
    fields: {
      magnet_type: {
        sqlColumn: 'magnet_type_id',
        sqlJoin: (magnetsTable, magnetTypesTable) =>
          `${magnetsTable}.magnet_type_id = ${magnetTypesTable}.magnet_type_id`
      },
      given_at: {
        sqlColumn: 'given_at'
      },
      user: {
        sqlColumn: 'user_id',
        sqlJoin: (magnetsTable, usersTable) =>
          `${magnetsTable}.user_id = ${usersTable}.user_id`
      },
      id: {
        sqlColumn: 'magnet_id'
      }
    }
  },
  MagnetType: {
    sqlTable: 'magnet_types',
    uniqueKey: 'magnet_type_id',
    fields: {
      created_by: {
        sqlColumn: 'created_by',
        sqlJoin: (magnetsTable, usersTable) =>
          `${magnetsTable}.created_by = ${usersTable}.user_id`
      },
      id: {
        sqlColumn: 'magnet_type_id'
      },
      name: {
        sqlColumn: 'name'
      },

      mainColor: {
        sqlColumn: 'main_color'
      },

      secondColor: {
        sqlColumn: 'second_color'
      },

      icon: {
        sqlColumn: 'icon'
      }
    }
  }
  // Post: {
  //   sqlTable: 'posts',
  //   uniqueKey: 'id',
  //   fields: {
  //     numComments: {
  //       // count with a correlated subquery
  //       sqlExpr: (table) =>
  //         `(SELECT count(*) FROM comments where ${table}.id = comments.post_id)`
  //     },
  //     comments: {
  //       // fetch the comments in another batch request instead of joining
  //       sqlBatch: {
  //         thisKey: 'post_id',
  //         parentKey: 'id'
  //       }
  //     }
  //   }
  // },
  // Comment: {
  //   sqlTable: 'comments',
  //   uniqueKey: 'id',
  //   fields: {
  //     postId: {
  //       sqlColumn: 'post_id'
  //     },
  //     authorId: {
  //       sqlColumn: 'author_id'
  //     }
  //   }
  // }
}
