import React from 'react'

function TokenOptionsList(tokenAdresses, User) {

    // {tokenAdresses.map(({ address,symbol}) => (
                                                        
    //     <option key={symbol} value={address}>
    //         {
    //             async () => {
    //             await getUserErc20Balance(address,User)
    //             console.log("await getUserErc20Balance(address,User): senders tokens:  ", await getUserErc20Balance(address,User))
    //         }
    //         }
    //                 </option>
    //                                     ))}





  return (
    <div>
      {tokenAdresses.map(({ address,symbol}) => (
                                                        
            <option key={symbol} value={address}>
                {symbol} testing
                
                {/* {
                getUserErc20Balance(address,User)
                } */}
                </option>
        ))}

    </div>
  )
}

export default TokenOptionsList
