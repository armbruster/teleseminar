//
//  ViewController.m
//  WebGLViewer
//
//  Created by Paul Steinhilber on 09.03.2012.
//

#import "ViewController.h"

@implementation ViewController

UIWebView* webView;
float batteryLevel;
float lastBatteryLevel;
NSDate* startDate;
BOOL checking = NO;

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad {
    [super viewDidLoad];
	
	// enabling WebGL as described by Nathan de Vries 
	// http://atnan.com/blog/2011/11/03/enabling-and-using-webgl-on-ios/
	
	webView = [[[UIWebView alloc] initWithFrame:theView.bounds] autorelease];
	
	id webDocumentView = [webView performSelector:@selector(_browserView)];
	id backingWebView = [webDocumentView performSelector:@selector(webView)];
	[backingWebView _setWebGLEnabled:YES];
	
	// disable scrolling
	webView.scrollView.scrollEnabled = NO; 
	webView.scrollView.bounces = NO;
	
	// configure proper resizing to support rotation
	webView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
	
	// register delegate to get feeedback
	webView.delegate = self;
	
	[theView addSubview:webView];
	
	// load a sample 
	// NSURLRequest* request = [NSURLRequest requestWithURL:[NSURL URLWithString: @"http://mrdoob.github.com/three.js/examples/canvas_geometry_cube.html" ]];
	NSURLRequest* request = [NSURLRequest requestWithURL:[NSURL URLWithString: @"http://oslo.paulsteinhilber.de/room.html" ]];
	[webView loadRequest:request];
}

- (void)viewDidUnload {
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
	[self becomeFirstResponder];
}

- (void)viewWillDisappear:(BOOL)animated {
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated {
	[super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
	if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
	    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
	} else {
	    return YES;
	}
}


// ----------------------------------------------------------------------------------------------------------------------------------
// Shake Gesture & Battery Stuff
// ----------------------------------------------------------------------------------------------------------------------------------

// save the current battery level
- (void)startWatchingBattery {
	[UIDevice currentDevice].batteryMonitoringEnabled = YES;
	
	batteryLevel = [UIDevice currentDevice].batteryLevel;
	lastBatteryLevel = batteryLevel;
	
	startDate = [[NSDate alloc] init];
	
	NSLog(@"%f", batteryLevel);
	
	if (!checking) {
		[self performSelector:@selector(checkBatteryLevel) withObject:nil afterDelay:0];
		checking = YES;
		NSLog(@"start checking");
	}
}

// constantly check the battery level, to inform the user if it has changed
-(void)checkBatteryLevel {
	
	if (lastBatteryLevel != [UIDevice currentDevice].batteryLevel) {
		[self showBatteryInfo];
		lastBatteryLevel = [UIDevice currentDevice].batteryLevel;
	}
	
	[self performSelector:@selector(checkBatteryLevel) withObject:nil afterDelay:10];
}

// show alert view with battery information
- (void)showBatteryInfo {
	
	NSString* batteryInfo;
	
	NSDate* endDate = [NSDate date];
	double ellapsedMinutes = [endDate timeIntervalSinceDate:startDate] / 60;
	
	if (batteryLevel == -1.0 || [UIDevice currentDevice].batteryState != UIDeviceBatteryStateUnplugged) {
		if ([UIDevice currentDevice].batteryState == UIDeviceBatteryStateFull) {
			batteryInfo = @"Device is fully loaded";
		} else {
			batteryInfo = @"Battery level not available.\nPlease unplug your device.";
		}
	} else {
		float currentLevel = [UIDevice currentDevice].batteryLevel;
		float delta = batteryLevel - currentLevel;
		batteryInfo = [NSString stringWithFormat:@" level on start: %f \n level now: %f \n delta: %f \n\n\n run for %f minutes \n battery consumption per minute: \n%f", batteryLevel*100, currentLevel*100, delta*100, ellapsedMinutes, delta*100/ellapsedMinutes];
	}

	NSLog(@"%@", batteryInfo);
	
	// show alert view
	UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Battery Usage Information" message:batteryInfo delegate:self cancelButtonTitle:@"Dismiss" otherButtonTitles:nil];
    [alert show];
}

- (void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event {
    NSLog(@"motionBegan");
	[self showBatteryInfo];
}

-(void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event{
    //NSLog(@"motionEnded");
}

-(BOOL)canBecomeFirstResponder {
	return YES;
}

- (IBAction)batteryInfoButton {
	[self showBatteryInfo];
}

// ----------------------------------------------------------------------------------------------------------------------------------
// "Address bar" + Reload
// ----------------------------------------------------------------------------------------------------------------------------------

/* load url from search bar in uiwebview */
- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar {
	[searchBar resignFirstResponder];

	if ([searchBar.text rangeOfString:@"http"].location == NSNotFound) {
		searchBar.text = [NSString stringWithFormat:@"http://%@", searchBar.text];
	}
	
	NSURLRequest* request = [NSURLRequest requestWithURL:[NSURL URLWithString: searchBar.text ]];
	[webView loadRequest:request];
}

- (IBAction)reload {
	[webView reload];
}

// ----------------------------------------------------------------------------------------------------------------------------------
// UIWebViewDelegate Methods
// ----------------------------------------------------------------------------------------------------------------------------------
- (void)webViewDidStartLoad:(UIWebView *)webView {
    // starting the load, show the activity indicator in the status bar
	UIApplication *application = [UIApplication sharedApplication];
	application.networkActivityIndicatorVisible = YES;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
    // finished loading, hide the activity indicator in the status bar
    //[UIApplication sharedApplication].setNetworkActivityIndicatorVisible = NO;
	UIApplication *application = [UIApplication sharedApplication];
	application.networkActivityIndicatorVisible = NO;
	
	// start watching battery here
	[self startWatchingBattery];
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
	/// komischen error abfangen der eignetlich kein error is
	///NSLog(@"Error %i", error.code);
    if (error.code == NSURLErrorCancelled) return; 
	
    // load error, hide the activity indicator in the status bar 
	//[UIApplication sharedApplication].setNetworkActivityIndicatorVisible = NO;
	UIApplication *application = [UIApplication sharedApplication];
	application.networkActivityIndicatorVisible = NO;
	
	///// no internet connection
	if(error.code == -1009) {
		NSString* noWebString = NSLocalizedStringFromTable (@"No Internet Connection", @"Custom", @"Errors");
		NSString* noWebStart = @"<html><center style=\"font-family:Helvetica;font-size:40px;font-weight:bold;text-align:left; padding: 40px;\">";
		NSString* noWebEnd = @"<br /><br /></center></html>";
		NSString* noWeb = [noWebStart stringByAppendingString:[noWebString stringByAppendingString:noWebEnd]];
		[webView loadHTMLString:noWeb baseURL:nil];
		return;
	}
	
    // report the error inside the webview
	NSString* An_err_middle = NSLocalizedStringFromTable (@"An error occurred:", @"Custom", @"Errors");
	NSString* An_err_start = @"<html><center style=\"font-family:Helvetica;font-size:40px;font-weight:bold;text-align:left; padding: 40px;\">";
	NSString* An_err_end = @"<br /><br /></center></html>";
	NSString* An_err = [An_err_start stringByAppendingString:[An_err_middle stringByAppendingString:An_err_end]];
    NSString* errorString = [NSString stringWithFormat: An_err, error.localizedDescription];
    [webView loadHTMLString:errorString baseURL:nil];
}


@end
