import {
  ActionIcon,
  AppShell,
  Burger,
  Card,
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import {
  TbActivityHeartbeat,
  TbAlertHexagon,
  TbCircle,
  TbCircleFilled,
  TbCircleHalf,
  TbShare,
} from "react-icons/tb";
import { Route, Routes } from "react-router-dom";
import { AppNavigationButton } from "./components/app-navigation-button.tsx";
import { AppNavigationLink } from "./components/app-navigation-link.tsx";
import { MonitorEditPage } from "./pages/monitor-edit.page.tsx";
import { MonitorPage } from "./pages/monitor.page.tsx";
import { MonitorsPage } from "./pages/monitors.page.tsx";

const navigation = [
  {
    path: "/monitors",
    label: "Monitoring",
    leftSection: <TbActivityHeartbeat />,
  },
  {
    path: "/incidents",
    label: "Incidents",
    leftSection: <TbAlertHexagon />,
  },
  {
    path: "/integrations",
    label: "Integrations",
    leftSection: <TbShare />,
  },
];

export const App: FC = () => {
  const theme = useMantineTheme();
  const scheme = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 82 }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header
        bg={
          scheme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[2]
        }
        withBorder={false}
      >
        <Card style={{ borderRadius: 0, height: 82 }}>
          <Group h={"100%"} align={"center"} justify={"space-between"}>
            <Group gap={"sm"}>
              <Text
                style={{
                  userSelect: "none",
                  fontSize: "xx-large",
                  fontFamily: "Portentous Distorted",
                }}
                variant="gradient"
                gradient={{ from: "orange", to: "pink" }}
              >
                watchtower
              </Text>
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              size="sm"
            />
            <Group visibleFrom={"md"}>
              {navigation.map(({ path, label, leftSection }) => (
                <AppNavigationButton
                  key={path}
                  path={path}
                  label={label}
                  leftSection={leftSection}
                />
              ))}
              <ActionIcon
                variant={"default"}
                onClick={scheme.toggleColorScheme}
              >
                {scheme.colorScheme === "auto" ? (
                  <TbCircleHalf />
                ) : scheme.colorScheme === "light" ? (
                  <TbCircle />
                ) : (
                  <TbCircleFilled />
                )}
              </ActionIcon>
            </Group>
          </Group>
        </Card>
      </AppShell.Header>
      <AppShell.Main
        bg={
          scheme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[1]
        }
      >
        <Routes>
          <Route path={"/monitors"} element={<MonitorsPage />} />
          <Route path={"/monitors/:id/edit"} element={<MonitorEditPage />} />
          <Route path={"/monitors/:id"} element={<MonitorPage />} />
        </Routes>
      </AppShell.Main>
      <AppShell.Navbar>
        {navigation.map(({ path, label, leftSection }) => (
          <AppNavigationLink
            key={path}
            path={path}
            label={label}
            leftSection={leftSection}
          />
        ))}
      </AppShell.Navbar>
    </AppShell>
  );
};
