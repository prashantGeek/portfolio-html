'use client'

// Debug component to show raw GitHub data
import { useState, useEffect } from 'react';

const GitHubDebug = () => {
  const [debugData, setDebugData] = useState<any>(null);

  useEffect(() => {
    const fetchDebugData = async () => {
      try {
        // Test the same API calls directly
        const userResponse = await fetch('https://api.github.com/users/prashantGeek');
        const userData = await userResponse.json();
        
        const reposResponse = await fetch('https://api.github.com/users/prashantGeek/repos?per_page=100&type=all&visibility=public');
        const reposData = await reposResponse.json();
        
        const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
        
        setDebugData({
          userPublicRepos: userData.public_repos,
          reposFetched: reposData.length,
          totalStars,
          sampleRepos: reposData.slice(0, 5).map((r: any) => ({
            name: r.name,
            stars: r.stargazers_count,
            private: r.private
          }))
        });
      } catch (error) {
        console.error('Debug fetch error:', error);
      }
    };

    fetchDebugData();
  }, []);

  if (!debugData) return <div className="text-white">Loading debug data...</div>;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-green-400 p-4 rounded font-mono text-xs max-w-md">
      <h3 className="text-yellow-400 mb-2">GitHub API Debug</h3>
      <div>User API Public Repos: {debugData.userPublicRepos}</div>
      <div>Repos Fetched: {debugData.reposFetched}</div>
      <div>Total Stars: {debugData.totalStars}</div>
      <div className="mt-2">Sample Repos:</div>
      {debugData.sampleRepos.map((repo: any, i: number) => (
        <div key={i} className="ml-2">
          {repo.name}: {repo.stars} stars {repo.private ? '(private)' : '(public)'}
        </div>
      ))}
    </div>
  );
};

export default GitHubDebug;
