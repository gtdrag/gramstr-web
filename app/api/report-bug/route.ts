import { NextRequest, NextResponse } from 'next/server'

// Linear API endpoint
const LINEAR_API_URL = 'https://api.linear.app/graphql'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, email, severity, platform } = body

    // Check if Linear API key is configured
    const linearApiKey = process.env.LINEAR_API_KEY
    if (!linearApiKey) {
      console.error('LINEAR_API_KEY not configured')
      return NextResponse.json(
        { error: 'Bug reporting is not configured' },
        { status: 500 }
      )
    }

    // Map severity to Linear priority
    const priorityMap: Record<string, number> = {
      critical: 1, // Urgent
      high: 2,     // High
      medium: 3,   // Medium
      low: 4       // Low
    }

    // Create issue description with metadata
    const fullDescription = `
${description}

---
**Platform:** ${platform}
**Severity:** ${severity}
${email ? `**Contact:** ${email}` : ''}
**Reported via:** gramstr.com
    `.trim()

    // Linear GraphQL mutation to create an issue
    const mutation = `
      mutation CreateIssue($title: String!, $description: String!, $priority: Int, $teamId: String!) {
        issueCreate(
          input: {
            title: $title
            description: $description
            priority: $priority
            teamId: $teamId
            labelIds: []
          }
        ) {
          success
          issue {
            id
            identifier
            url
          }
        }
      }
    `

    // Get team ID from environment variable
    const teamId = process.env.LINEAR_TEAM_ID
    
    if (!teamId) {
      console.error('LINEAR_TEAM_ID not configured')
      return NextResponse.json(
        { error: 'Bug reporting is not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': linearApiKey,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          title: `[Bug] ${title}`,
          description: fullDescription,
          priority: priorityMap[severity] || 3,
          teamId: teamId
        }
      })
    })

    const data = await response.json()

    if (data.errors) {
      console.error('Linear API errors:', data.errors)
      return NextResponse.json(
        { error: 'Failed to create issue' },
        { status: 500 }
      )
    }

    if (data.data?.issueCreate?.success) {
      return NextResponse.json({
        success: true,
        issueId: data.data.issueCreate.issue.identifier,
        issueUrl: data.data.issueCreate.issue.url
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to create issue' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating Linear issue:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}