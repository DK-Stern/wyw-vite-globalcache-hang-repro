import { styled } from '@linaria/react';
import { colors, spacing } from '../theme';
import { StyledNavBar } from './NavBar';
import { StyledCard } from './Card';
import { StyledUserCard } from './UserCard';
import { StyledTaskItem } from './TaskItem';
import { StyledAlert } from './Alert';
import { StyledInput } from './Input';

const AppLayout = ({ className }) => (
  <div className={className}>
    <StyledNavBar title="WyW Bug Repro" />
    <main>
      <StyledAlert message="globalCache: false causes vite build to hang — runner processes leak" type="warning" />
      <StyledInput placeholder="Search..." />
      <div className="grid">
        <StyledUserCard name="Alice" role="Engineer" online={true} />
        <StyledUserCard name="Bob" role="Designer" online={false} />
        <StyledCard title="Task A">
          <StyledTaskItem title="Fix bug" status="in-progress" progress={60} />
        </StyledCard>
        <StyledCard title="Task B">
          <StyledTaskItem title="Write tests" status="todo" progress={0} />
        </StyledCard>
        <StyledCard title="Task C">
          <StyledTaskItem title="Deploy" status="done" progress={100} />
        </StyledCard>
      </div>
    </main>
  </div>
);

export const StyledAppLayout = styled(AppLayout)`
  min-height: 100vh;
  background: ${colors.background};

  main {
    max-width: 960px;
    margin: 0 auto;
    padding: ${spacing.xl};
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${spacing.md};
  }
`;
