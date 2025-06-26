// GitHub API service for fetching real contribution data
// You'll need to add your GitHub Personal Access Token for full functionality

interface GitHubContribution {
  date: string;
  contributionCount: number;
  color: string;
}

interface GitHubStats {
  totalContributions: number;
  weeks: Array<{
    contributionDays: GitHubContribution[];
  }>;
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{
            contributionCount: number;
            date: string;
          }>;
        }>;
      };
    };
    repositories: {
      totalCount: number;
    };
    followers: {
      totalCount: number;
    };
    following: {
      totalCount: number;
    };
  };
}

// GitHub GraphQL API endpoint
const GITHUB_API_URL = 'https://api.github.com/graphql';

// GraphQL query to fetch contribution data
const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
        totalCount
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
`;

// Function to fetch GitHub contributions using REST API (public data)
export async function fetchGitHubContributions(username: string = 'prashantGeek') {
  try {
    // Fetch user profile data
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();

    // Fetch repositories with more details (ensure we get all public repos)
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=all&visibility=public`);
    const reposData = await reposResponse.json();

    console.log(`Fetched ${reposData.length} repositories for ${username}`);
    console.log('Repository data sample:', reposData.slice(0, 3).map((r: any) => ({ name: r.name, stars: r.stargazers_count })));
    console.log('User API says public_repos:', userData.public_repos);

    // Fetch events for more accurate activity data
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
    const eventsData = await eventsResponse.json();

    // Calculate commit statistics from events (real data only)
    const commitEvents = eventsData.filter((event: any) => 
      event.type === 'PushEvent' && event.payload && event.payload.commits
    );
    
    let totalCommitsFromEvents = 0;
    commitEvents.forEach((event: any) => {
      if (event.payload && event.payload.commits) {
        totalCommitsFromEvents += event.payload.commits.length;
      }
    });

    console.log(`Found ${totalCommitsFromEvents} commits in recent ${commitEvents.length} push events`);

    // Calculate contribution statistics from available data
    // Use the authoritative count from user API for public repos
    const publicRepos = userData.public_repos; // Use official count from user API
    const actualReposFetched = reposData.length; // What we actually fetched
    const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);
    
    console.log(`Statistics calculated:`, {
      officialPublicRepos: publicRepos,
      actualReposFetched,
      totalStars, 
      totalForks
    });
    
    // Get languages used
    const languages = new Set();
    reposData.forEach((repo: any) => {
      if (repo.language) languages.add(repo.language);
    });

    // Generate contribution grid with ONLY real activity data
    const contributionData = generateContributionGrid(publicRepos, totalStars, eventsData);

    // Use actual contribution count from real data (no extrapolation)
    const actualTotalCommits = contributionData.totalContributions;

    return {
      user: {
        login: userData.login,
        name: userData.name,
        bio: userData.bio,
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        created_at: userData.created_at,
      },
      stats: {
        totalContributions: contributionData.totalContributions,
        publicRepos,
        totalStars,
        totalForks,
        languages: Array.from(languages),
        longestStreak: contributionData.longestStreak,
        currentStreak: contributionData.currentStreak,
        totalCommits: Math.floor(actualTotalCommits),
        recentCommits: totalCommitsFromEvents,
        lastActivity: eventsData[0]?.created_at || null,
      },
      contributionData: contributionData.weeks,
      recentRepos: reposData.slice(0, 6).map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: repo.updated_at,
        url: repo.html_url,
        size: repo.size,
        commits_url: repo.commits_url,
      })),
      recentActivity: eventsData.slice(0, 10).map((event: any) => ({
        type: event.type,
        repo: event.repo?.name,
        created_at: event.created_at,
        commits: event.payload?.commits?.length || 0,
      })),
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
}

// Generate contribution grid with ONLY real GitHub data (last 6 months)
function generateContributionGrid(repos: number, stars: number, eventsData: any[] = []) {
  const months = 6; // Show last 6 months instead of full year
  const weeksData = [];
  let totalContributions = 0;

  // Create a map of REAL activity from events (only actual commits)
  const activityMap = new Map<string, number>();
  eventsData.forEach((event: any) => {
    if (event.type === 'PushEvent' && event.created_at) {
      const eventDate = new Date(event.created_at);
      const dateString = eventDate.toISOString().split('T')[0];
      const commits = event.payload?.commits?.length || 1;
      activityMap.set(dateString, (activityMap.get(dateString) || 0) + commits);
    }
  });

  // Start from exactly 6 months ago, at the beginning of the week
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - months);
  startDate.setDate(1); // Start from the first day of that month
  
  // Find the Monday of the week containing the start date
  const startDayOfWeek = startDate.getDay();
  const daysToSubtract = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Monday = 0
  startDate.setDate(startDate.getDate() - daysToSubtract);

  // Calculate total weeks needed
  const totalWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

  for (let week = 0; week < totalWeeks; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + (week * 7) + day);
      
      // Only include dates up to today
      if (date > endDate) {
        break;
      }

      const dateString = date.toISOString().split('T')[0];
      
      // ONLY use real activity data - no fake data
      const contributions = activityMap.get(dateString) || 0;
      totalContributions += contributions;

      weekData.push({
        date: dateString,
        count: contributions,
        level: contributions === 0 ? 0 : 
               contributions <= 2 ? 1 :
               contributions <= 5 ? 2 :
               contributions <= 8 ? 3 : 4,
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        isRecent: (endDate.getTime() - date.getTime()) < (7 * 24 * 60 * 60 * 1000) // Last 7 days
      });
    }
    if (weekData.length > 0) {
      weeksData.push(weekData);
    }
  }

  // Calculate streak information
  const streaks = calculateStreaks(weeksData);

  return {
    totalContributions,
    weeks: weeksData,
    longestStreak: streaks.longest,
    currentStreak: streaks.current,
    timeRange: `${months} months`,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
}

// Function to fetch with GitHub token (for private data)
export async function fetchGitHubContributionsWithToken(username: string = 'prashantGeek', token?: string) {
  if (!token) {
    console.warn('No GitHub token provided, using public data only');
    return fetchGitHubContributions(username);
  }

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { username },
      }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      throw new Error('Failed to fetch GitHub data');
    }

    return {
      user: data.data.user,
      stats: {
        totalContributions: data.data.user.contributionsCollection.contributionCalendar.totalContributions,
        publicRepos: data.data.user.repositories.totalCount,
        followers: data.data.user.followers.totalCount,
        following: data.data.user.following.totalCount,
      },
      contributionData: data.data.user.contributionsCollection.contributionCalendar.weeks,
    };
  } catch (error) {
    console.error('Error fetching GitHub data with token:', error);
    // Fallback to public API
    return fetchGitHubContributions(username);
  }
}

// Helper function to get contribution level color
export function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

// Calculate streak information
export function calculateStreaks(contributionData: any[]): { longest: number; current: number } {
  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  const flatData = contributionData.flat();
  const sortedData = flatData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  for (let i = sortedData.length - 1; i >= 0; i--) {
    if (sortedData[i].count > 0) {
      tempStreak++;
      if (i === sortedData.length - 1 || 
          new Date(sortedData[i + 1].date).getTime() - new Date(sortedData[i].date).getTime() === 86400000) {
        currentStreak = tempStreak;
      }
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 0;
      if (currentStreak === 0) {
        currentStreak = 0;
      }
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);
  
  return { longest: longestStreak, current: currentStreak };
}
