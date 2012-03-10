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
	
	[theView addSubview:webView];
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

- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar {
	[searchBar resignFirstResponder];

	if ([searchBar.text rangeOfString:@"http"].location == NSNotFound) {
		searchBar.text = [NSString stringWithFormat:@"http://%@", searchBar.text];
	}
	
	NSURLRequest* request = [NSURLRequest requestWithURL:[NSURL URLWithString: searchBar.text ]];
	[webView loadRequest:request];
}

@end
