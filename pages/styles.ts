import { StyleSheet } from 'react-native';

export const backButtonStyles = StyleSheet.create({
  container: {
    width: '10%',
    marginLeft: 16,
  },
});

export const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  title: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    margin: 16,
    fontWeight: 900,
  },
  thumbnailContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  summaryContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  summary: {
    fontSize: 14,
    color: 'white',
    textAlign: 'left',
    margin: 16,
  },
  playPauseButton: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
  },
  errorContainer: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
