import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1E3A8A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
    error: { main: '#EF4444' },
    warning: { main: '#F59E0B' },
    info: { main: '#3B82F6' },
    success: { main: '#10B981' },
  },
  typography: {
    fontFamily: '"Figtree Variable", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#2563EB',
            '&:hover': { backgroundColor: '#1D4ED8' },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          borderBottom: '1px solid #E5E7EB',
          fontFamily: '"Figtree Variable", sans-serif',
        },
        head: {
          backgroundColor: '#F9FAFB',
          fontWeight: 600,
          color: '#374151',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: '#F3F4F6' },
        },
      },
    },
    // AppBar : fond bleu foncé, texte blanc, pas de border-radius
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: '#1E40AF', // blue-800
          color: '#FFFFFF',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    // Drawer (Sidebar) : fond bleu plus foncé
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          backgroundColor: '#1E3A8A', // blue-900
          color: '#FFFFFF',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: { padding: 0 },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: { color: '#93C5FD' },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: { fontWeight: 500, color: '#FFFFFF' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontFamily: '"Figtree Variable", sans-serif' },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: { fontFamily: '"Figtree Variable", sans-serif' },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { fontFamily: '"Figtree Variable", sans-serif' },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { fontFamily: '"Figtree Variable", sans-serif' },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontFamily: '"Figtree Variable", sans-serif' },
      },
    },
  },
});