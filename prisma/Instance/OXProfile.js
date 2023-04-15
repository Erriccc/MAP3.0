import prisma from '.'

export async function getAll() {
  try {
    const users = await prisma.OXProfile.findMany()
    return users
  } catch (error) {
    return { error }
  }
}
 
export async function createOne(OXProfile) {

  try { 
    const checkBeforeCreate = await checkIfOneExistById(OXProfile.vendorsWalletAddress)
    if (checkBeforeCreate.exists){
        return { OXProfile: checkBeforeCreate.user }
    }else {
        const NftFromDB = await prisma.OXProfile.create({ data: OXProfile })
        return { OXProfile: NftFromDB }
    }
  } catch (error) {
    return { error }
  }

}

export async function getOneById(vendorsWalletAddress) {
  try {
    const one = await prisma.OXProfile.findUnique({where: { vendorsWalletAddress }})
    return { one }
  } catch (error) {
    return { error }
  }
}

export async function checkIfOneExistById(vendorsWalletAddress) {
    try {
      const one = await prisma.OXProfile.findUnique({where: { vendorsWalletAddress }})
      if (one.vendorsWalletAddress == vendorsWalletAddress){
        return {exists:true, user: one}
      }else{
        return {exists:false, user: one}
      }
    } catch (error) {
      throw error 
    }
  }


  export async function searchForManyByEmailOrAddress(emailOrAddress) {
    try {
    
    const users = await prisma.OXProfile.findMany({
      where: {
        OR: [
          {
            vendorsWalletAddress: {
              contains: emailOrAddress,
            },
          },
          {
            vendorsName: {
              contains: emailOrAddress,
            },
          },
         
        ],
      },
    })
    console.log('usersusersusersusersusersusers', users)
    return users
  } catch (error) {
    throw error 
  }

  }




  export async function searchForManyByKeywordsOrBioOrName(emailOrAddress) {
    const possibleKeywords = emailOrAddress.split(" ")
    const stringContainsKeywords = possibleKeywords.length >= 1
    try {
    
    let users ;

    stringContainsKeywords == true ? (


      users = await prisma.OXProfile.findMany({ where: {
        OR: [
          {
            vendorsWalletAddress: {
              contains: emailOrAddress,
            },
          },
          {
            vendorsName: {
              contains: emailOrAddress,
            },
            
          },
          {
            vendorsEmail: {
              contains: emailOrAddress,
            },
          },
          {
            vendorsBio:{
              contains: emailOrAddress,
            }
          },
          {
            keyWords: {
              hasSome: [emailOrAddress],
            },
          }
        ],
        AND: {
          // vendorsLat: false,
          vendorsLat: {
            not: null // User has no LAT and LONG
        }
        ,AND: {
          vendorsLong: {
            not: null // User has no LAT and LONG
        },
        }
        },
      },
    })


    ):(

 // const users = await prisma.OXProfile.findMany({
  users = await prisma.OXProfile.findMany({ where: {
    OR: [
      {
        vendorsWalletAddress: {
          contains: emailOrAddress,
        },
      },
      {
        vendorsName: {
          contains: emailOrAddress,
        },
        
      },
      {
        vendorsEmail: {
          contains: emailOrAddress,
        },
      },
      {
        vendorsBio:{
          contains: emailOrAddress,
        }
      },
    ],
    AND: {
      // vendorsLat: false,
      vendorsLat: {
        not: null // User has no LAT and LONG
    }
    ,AND: {
      vendorsLong: {
        not: null // User has no LAT and LONG
    },
    }
    },
  },
})

    )
     
    console.log('usersusersusersusersusersusers', users)
    return users
  } catch (error) {
    throw error 
  }

  }




  



export async function deleteOneById(vendorsWalletAddress) {
  try {
    const one = await prisma.OXProfile.delete({where: { vendorsWalletAddress }})
    return { one }
  } catch (error) {
    return { error }
  }
}

export async function updateOneById(vendorsWalletAddress, data) {
  try {
    const one = await prisma.OXProfile.update({
      where: { vendorsWalletAddress },
      data
    })
    return { OXProfile: one }
  } catch (error) {
    return { error }
  }
}
