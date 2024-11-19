import React from 'react'
import { Tooltip } from '@mui/material';

export default function VoterCard({voterArray}) {

    const getStatusLabel = (status) => {
        switch (status) {
          case 0:
            return 'Pending';
          case 1:
            return 'Approved';
          case 2:
            return 'Rejected';
          default:
            return 'Unknown';
        }
      };

      
  return (
    <div className="flex flex-wrap justify-center gap-4">
        {voterArray.map((voter, index) => (
            <div key={index +1} className="max-w-sm rounded-xl overflow-hidden shadow-xl bg-white m-4 transition duration-500 ease-in-out transform hover:scale-90 border-2 border-black">
                <div className="px-4 py-4">
                    <img src='../../asset/modi.webp' alt='profile photo' className="inline-block h-20 w-42 rounded-full ring-2 ring-blue-500 mb-4"></img>
                    <div className="font-bold text-xl mb-2">{voter[1]}</div>
                    <p className="text-sm text-gray-700 mb-2">Address: {voter[2]? voter[2].slice(0,30) + '...' : 'Address not available'}</p>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Details:</p>
                    <div className="text-sm mb-2 text-gray-600">Voter ID:{voter[0].toNumber()}</div>
                    <div className="text-sm mb-2 text-gray-600">Voter Status: {getStatusLabel(voter[6])}</div>
                    <Tooltip title={voter[4] ? 'You Already Voted' : 'You can give the vote on home page'}>
                        <p className="text-sm text-white mb-2 bg-black hover:bg-blue-400 text-white font-bold py-2 px-4 rounded text-center">
                            {voter[4] ? 'You Already Voted' : 'Not Voted Yet'}
                        </p>
                    </Tooltip>
                </div>
            </div>
        ))}
    </div>
  )
}
