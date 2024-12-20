import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formatDistanceToNow } from 'date-fns';
import commentsIcon from '../assets/comments-icon.png'


const GithubSnippet = ({ owner, repo, filePath, startLine, endLine, toggleDetails }) => {

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [fileAge, setFileAge] = useState('');

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${owner}`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, [owner, token]);


  useEffect(() => {
    const fetchCode = async() => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3.raw',
              Authorization: `token ${token}`,
            },
          });

        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/commits`,
          {
            params: { path: filePath, per_page: 1 },
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );

        const lastCommit = commitsResponse.data[0];
        const lastModifiedDate = new Date(lastCommit.commit.committer.date);
        setFileAge(formatDistanceToNow(lastModifiedDate) + ' ago');

        const lines = response.data.split('\n');
        const snippet = lines.slice(startLine - 1, endLine).join('\n');
        setCode(snippet);
      } catch (err) {
        setError('Failed to fetch code snippet.')
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [owner, repo, filePath, endLine, startLine, token]);

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
            <div className="flex flex-col items-center"> <h3 className="text-sm -ml-5 font-bold text-[14px] text-blue">@{profile.username || profile.login}</h3>
              {fileAge && <p className="text-gray-400 text-xs"> {fileAge}</p>}
            </div>
          </div>
          <button onClick={toggleDetails} className="flex group hover:underline gap-1 items-center cursor-pointer">
            <img src={commentsIcon} alt="comments icon" className='hover:cursor-pointer'/>
            details
          </button>
         </div>
      )}
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ background: '#011221', fontSize: '0.9rem' }} className="border rounded-xl border-line-color">
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default GithubSnippet;
