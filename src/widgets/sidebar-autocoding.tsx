import React, { useState } from 'react';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import { useNavigate } from 'react-router-dom';

export const SidebarAutoCoding = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleSelect = (eventKey: string) => {
    switch (eventKey) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/brands');
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        width: expanded ? 240 : 56,
        transition: '0.3s',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>
          <Nav onSelect={handleSelect}>
            <Nav.Item style={{whiteSpace:'nowrap'}} eventKey="1" icon={<DashboardIcon />}   >
              Открытые вопросы
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              Бренды
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
