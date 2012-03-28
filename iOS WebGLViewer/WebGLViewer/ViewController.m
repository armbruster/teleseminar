//
//  ViewController.m
//  WebGLViewer
//
//  Created by Paul Steinhilber on 09.03.2012.
//

#import "ViewController.h"

@implementation ViewController

UIWebView* webView;

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
	
	
	// enabling WebGL as described by Nathan de Vries 
	// http://atnan.com/blog/2011/11/03/enabling-and-using-webgl-on-ios/
	
	webView = [[[UIWebView alloc] initWithFrame:theView.bounds] autorelease];
	
	id webDocumentView = [webView performSelector:@selector(_browserView)];
	id backingWebView = [webDocumentView performSelector:@selector(webView)];
	[backingWebView _setWebGLEnabled:YES];
	
	webView.scrollView.scrollEnabled = NO; 
	webView.scrollView.bounces = NO;
	
	
	// register delegate to get feeedback
	webView.delegate = self;
	
	
	[theView addSubview:webView];
	
	// load a sample 
	NSURLRequest* request = [NSURLRequest requestWithURL:[NSURL URLWithString: @"http://mrdoob.github.com/three.js/examples/canvas_geometry_cube.html" ]];
	[webView loadRequest:request];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
	[super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
	if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
	    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
	} else {
	    return YES;
	}
}

- (IBAction)reload {
	[webView reload];
}

- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar {
	[searchBar resignFirstResponder];

	if ([searchBar.text rangeOfString:@"http"].location == NSNotFound) {
		searchBar.text = [NSString stringWithFormat:@"http://%@", searchBar.text];
	}
	
	NSURLRequest* request = [NSURLRequest requestWithURL:[NSURL URLWithString: searchBar.text ]];
	[webView loadRequest:request];
}

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
