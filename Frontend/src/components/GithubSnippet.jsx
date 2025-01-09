import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import commentsIcon from '../assets/comments-icon.png'
import closeIcon from '../assets/close-icon.png'

const SkeletonLoader = () => (
  <div className="animate-pulse">
    {/* Profile Section */}
    <div className="flex items-center mb-4 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
        <div className="flex flex-col">
          <div className="w-20 h-3 bg-gray-700 rounded-md"></div>
          <div className="w-16 h-2 bg-gray-700 rounded-md mt-1"></div>
        </div>
      </div>
      <div className="w-12 h-4 bg-gray-700 rounded-md"></div>
    </div>

    {/* Code Snippet Section */}
    <div className="h-40 bg-gray-800 rounded-xl"></div>
  </div>
);

const GithubSnippet = ({ owner, repo, filePath, startLine, endLine }) => {

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [fileAge, setFileAge] = useState('');
  const [details, setDetails] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/github/fetch-profile`, {
          owner,
        });

        setProfile(response.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, [owner, API_BASE_URL]);


  useEffect(() => {
    const fetchCode = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/api/github/fetch-snippet`,
          {
            owner,
            repo,
            filePath,
            startLine,
            endLine,
          });

        const { snippet, fileAge  } = response.data

        setCode(snippet);
        setFileAge(`${fileAge}`)
      } catch (err) {
        setError('Failed to fetch code snippet.')
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [owner, repo, filePath, endLine, startLine, API_BASE_URL]);


  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="text-white rounded-lg mb-5">
      {profile && (
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center gap-2">
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-9 h-9 rounded-full"
            />
            <div className="flex flex-col items-center"> <h3 className="text-sm -ml-5 font-bold text-[14px] text-blue">@{profile.login}</h3>
              {fileAge && <p className="text-gray-400 text-xs"> {fileAge}</p>}
            </div>
          </div>
          <button onClick={() => setDetails(!details)} className="flex group hover:underline gap-1 items-center cursor-pointer">
            <img src={commentsIcon} alt="comments icon" className='hover:cursor-pointer' />
            details
          </button>
        </div>
      )}
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ background: '#011221', fontSize: '0.9rem' }} className="border rounded-xl border-line-color">
        {code}
      </SyntaxHighlighter>
      {details && (<article className='border-t border-line-color p-3 relative mt-5'>
        <p className='text-[14px] text-light-gray'>My work here was 5 months ago. It was for the project called Find Your Hat Game. This project involved implementing a terminal-based game using JavaScript, where players navigate through a randomly generated field to find a hidden hat while avoiding holes. </p>
        <button onClick={() => setDetails(false)}><img src={closeIcon} alt="close button" className='absolute top-2 right-0 w-4 h-4 hover:cursor-pointer' /></button>
      </article>)}
    </div>
  );
}

export default GithubSnippet;
