//
//  ViewController.h
//  WebGLViewer
//
//  Created by Paul Steinhilber on 09.03.2012.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController <UIWebViewDelegate> {
	IBOutlet UIView* theView;
}

- (IBAction)reload;

- (void)startWatchingBattery;

@end
